const _ = require("lodash");
const Promise = require("bluebird");
const aws = require("aws-sdk");

class awsec2 {
  constructor(credentials) {
    this.credentials = credentials;
    aws.config.update(this.credentials);
    this._ec2 = new aws.EC2({ apiVersion: "2016-11-15" });
  }

  InstanceIds(state) {
    return new Promise((resolve, reject) => {
      this._ec2.describeInstances({}, (err, data) => {
        if (err) {
          return reject(err);
        }
        const instances = _(data.Reservations)
          .map("Instances")
          .flatten()
          .value();

        /*
           1 - Refer running instanceid
           0 - Refer stopped instanceid
          '' - Refer all instanceid
        */

        if (state == 1) {
          const instanceIds = instances.map((instance) => {
            if (instance.State.Name == "running") return instance.InstanceId;
          });
          const ids = instanceIds.filter((instanceId) => {
            if (instanceId != "undefined") return instanceId;
          });
          return resolve(ids);
        } else if (state == 0) {
          const instanceIds = instances.map((instance) => {
            if (instance.State.Name == "stopped") return instance.InstanceId;
          });
          const ids = instanceIds.filter((instanceId) => {
            if (instanceId != "undefined") return instanceId;
          });
          return resolve(ids);
        } else {
          const instanceIds = instances.map((instance) => {
            return instance.InstanceId;
          });
          return resolve(instanceIds); // Return value like this [ 'i-0a47d5abe5f9bb0dc' ]
        }
      });
    });
  }

  startInstances(id) {
    return new Promise((resolve, reject) => {
      this.InstanceIds(0).then((result) => {
        if (id) {
          var params = { InstanceIds: [id] };
        } else {
          var params = { InstanceIds: result };
          if (result === []) {
            throw new Error("No instance in stop state...");
          } else {
            var params = { InstanceIds: result };
          }
        }

        this._ec2.startInstances(params, (err, res) => {
          if (err) {
            return reject(err);
          } else {
            const instances = _(res.StartingInstances).flatten().value();
            const StartingInstanceIDs = instances.map((instance) => {
              if (instance.PreviousState.Code == 80) return instance.InstanceId;
            });
            return resolve(StartingInstanceIDs);
          }
        });
      });
    });
  }

  stopInstances(id) {
    return new Promise((resolve, reject) => {
      this.InstanceIds(1).then((result) => {
        if (id) {
          var params = { InstanceIds: [id] };
        } else {
          var params = { InstanceIds: result };
          if (result === []) {
            throw new Error("No instance in start state...");
          } else {
            var params = { InstanceIds: result };
          }
        }

        this._ec2.stopInstances(params, (err, res) => {
          if (err) {
            return reject(err);
          } else {
            const instances = _(res.StartingInstances).flatten().value();
            console.log(instances);
            const StartingInstanceIDs = instances.map((instance) => {
              if (instance.PreviousState.Code == 16) return instance.InstanceId;
            });
            return resolve(StartingInstanceIDs);
          }
        });
      });
    });
  }
}

module.exports = awsec2;

// https://github.com/fabienvauchelles/scrapoxy/blob/develop/server/providers/awsec2/index.js


Do not change the environment variable


    export AWS_ACCESS_KEY_ID=""
    export AWS_SECRET_ACCESS_KEY=""
    export REGION=""

    1  sudo apt update
    2  # Using Ubuntu
    3  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    4  sudo apt-get install -y nodejs
    5  node --version
    6  history
    7  git clone https://github.com/FourTimes/node-api-server.git
    8  cd node-api-server
    9   node index.js   # 8080 (Open the security port also)
    10  git clone https://github.com/FourTimes/react-api-ui.git
    11  cd react-api-ui
    12  vim package.json => Replace the proxy url
        "proxy": "http://127.0.0.1:8080" => "proxy": "http://xxx.xxx.xxx.xxx:8080"
    12  npm  start      # 3000 (Open the security port also)



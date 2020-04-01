Vagrant.configure("2") do |config|
  config.vm.hostname = "dev.local"
  config.vm.box = "hashicorp/bionic64"
  config.vm.network "forwarded_port", guest: 80, host: 1337, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 3000, host: 1338, host_ip: "127.0.0.1"
  config.vm.synced_folder ".", "/vagrant"
  config.ssh.forward_agent = true
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  # Local setup script
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get upgrade -y \
       --allow-downgrades --allow-remove-essential --allow-change-held-packages
    apt-get autoremove -y
    apt-get clean -y
    apt-get install -y \
        wget \
        unzip \
        awscli \
        curl

    # Install NodeJS 12.x
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    apt-get install nodejs -y

    # Install Yarn and dev dependancies
    cd /vagrant/api
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update && sudo apt install yarn
    yarn global add serverless
    yarn install

    # Setup Apache for local website
    apt-get install -y apache2
    cp /vagrant/devops/local/001-web.conf /etc/apache2/sites-available/
    sudo a2dissite 000-default
    sudo a2ensite 001-web
    sudo service apache2 reload

    # Setup MySQL username and password
    debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
    debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
    apt-get install -y mysql-server

    # Install Terraform
    wget https://releases.hashicorp.com/terraform/0.12.20/terraform_0.12.20_linux_amd64.zip
    unzip terraform_0.12.20_linux_amd64.zip
    mv terraform /usr/bin/terraform
    rm terraform_0.12.20_linux_amd64.zip
  SHELL
end

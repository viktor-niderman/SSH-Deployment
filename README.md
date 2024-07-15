# SSH Deployment Project

This project helps you deploy changes to a server via SSH using google/zx.

## Getting Started

To set up and start working with this project, follow these steps:

1. **Install google/zx**:
   ```sh
   npm install zx@8.0.0
   ```

2. **Copy the example settings folder**:
   ```sh
   cp example_setting settings
   ```

3. **Configure Tags**:
    - Open `settings/tags.mjs`.
    - Fill in the list of tags. Tags are shorthand names associated with servers and commands.

4. **Configure Server Data**:
    - Open `settings/configs.mjs`.
    - Fill in the details about the servers you use.

5. **Create Command List**:
    - Open `settings/commands.mjs`.
    - Using the provided example, create a list of commands you need to execute on your servers.

## Usage

Once you have configured the settings, simply run the `deploy.mjs` file to deploy changes to your servers.

```sh
zx deploy.mjs
```

This will execute the commands on the specified servers as per your configuration.

---

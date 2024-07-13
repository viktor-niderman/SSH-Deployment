import tags from './tags.mjs'

export default [
  {
    "serverName": "Some pseudonym of your server",
    "remoteUser": "userName",
    "tags": [tags.my_server, tags.for_every_server],
    "hostname": "0.0.0.0",
    "port": "22 (optional)",
    "passphrase": "secret (optional)",
    "ssh": {
      "IdentityFile": "/path/to/ssh/id_rsa (optional)"
    }
  }
]

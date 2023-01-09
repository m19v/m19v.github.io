---
title: SSH
---

Create a multiple ssh tunnel (e.g. https://www.tunnelsup.com/how-to-create-ssh-tunnels/):
- Create via putty ssh connect and put the tunnel for the connection (e.g. settings-connection-add tunnel)
- from the second host, if needed, run the command to create second tunnel ```ssh -L 21521:localhost:1521 userofgoalhost@goalhost.com```

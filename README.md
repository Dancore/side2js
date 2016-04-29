==TEST==

*Tips & tricks*

If Gitlab ssh server is located on a non-standard port, i.e 10022, 
you can try to set remote with port included like this:
    git remote add origin ssh://user@git.arcmage.com:10022/dan/selenium-experiments.git
- However, it does NOT work for me (tested on Mac OSX 10.10) :(

Instead, please edit ~/.ssh/config and add a section like this:
Host git.arcmage.com
    Port 10022

- That works! :)

*Suggested git config in Linux* (Certificate/auth issue solution, etc):
http.sslcainfo=/etc/ssl/arcmage-rootCA.pem
git config --global http.sslcainfo /etc/ssl/arcmage-rootCA.pem

User config:
git config --global user.name "user"
git config --global user.email "user@gmail.com"

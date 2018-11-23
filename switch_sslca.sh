SSLCA="C:/Program/Git/mingw64/ssl/certs/ca-bundle.crt"
if [ -f myconfig.local.sh ]; then
. ./myconfig.local.sh
fi
FROM=`git config --local -l |grep "http.sslcainfo"| cut -d"=" -f2`
echo -en "Switching SSL path\nFrom: $FROM\n"
if [ ! -z $FROM ] && [ $FROM == $SSLCA ]; then 
    TO="(unset)"
    git config --local --unset http.sslcainfo
else
    TO=$SSLCA
    git config --local http.sslcainfo $TO
fi

echo -e "To:   $TO"

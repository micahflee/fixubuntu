#!/bin/bash

# Here's a script version of the copy and paste command. If this grows 
# very much longer, perhaps the code to copy and paste should just be:
# wget -q -O - https://fixubuntu.com/fixubuntu.sh | bash

gsettings set com.canonical.Unity.Lenses remote-content-search none; 

if [ "`/usr/bin/lsb_release -rs`" < 13.10 ]; then
  sudo apt-get remove -y unity-lens-shopping; 
else 
  gsettings set com.canonical.Unity.Lenses disabled-scopes "['more_suggestions-amazon.scope', 'more_suggestions-u1ms.scope', 'more_suggestions-populartracks.scope', 'music-musicstore.scope', 'more_suggestions-ebay.scope', 'more_suggestions-ubuntushop.scope', 'more_suggestions-skimlinks.scope']"; 
fi; 

echo | sudo tee -a /etc/hosts
echo 127.0.0.1 productsearch.ubuntu.com | sudo tee -a /etc/hosts

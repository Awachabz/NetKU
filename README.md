# NetKU 
Adalah Sebuah Web Yang Kami kembangkan sejak Semester 4 



# Cara Install 
install proyek

    npm init 

install Jest

    npm install --save-dev jest
 


Menambahkan tdd

 Buat file pengujian

Contoh: 

coba.js 

scipt :
    function coba(a, b) {
     return a + b;
      }
      module.exports = coba;




coba.test.js

       const coba = require('./coba');

     test('adds 1 + 2 to equal 3', () => {
     expect(coba(1, 2)).toBe(3);
     });





Install Babel 

    npm install --save-dev @babel/core @babel/cli @babel/preset-env

buat file : .babelrc

script : 
   {
      "presets": ["@babel/preset-env"]
   }





install Code Coverage

    npx jest --coverage   



Package.json

tambahkan 
script : 

      "scripts": {
      "test": "jest --coverage",
      "build": "babel src --out-dir dist"  
     },



Jalankan : 

    npm test




menyambungkan dengan GIT

install Git:

    git init


menambahkan semua file ke Git:


    git add .



Buat commit awal


    git commit -m "initial commit"

-(initial commit) Wajib, Bebas menggunakan kata apa saja   
contoh : "Menambahkan Fitur Login"
         "Menamahkan Logo"


Periksa nama cabang Lokal

    git branch


Maka akan keluar 
*Master
*Main


Jika *Master Push dengan
    git push -u origin master



Ganti cabang lokal dari Master ke Main
     git branch -m master main

mengirim cabang ke repository Github
     git push origin main


Push Ke Github
Cek Status : 
    git status
Menambahkan file/merubah file : 
    git add .

Buat Perubahan :
   git commit -m "Pesan untuk menjelaskan perubahan"
   
         contoh : " Menambahkan fitur login"
                   " Memperbaiki bug pada halaman"








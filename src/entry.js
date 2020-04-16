//entry.js

import $ from 'jquery';


console.log($)



// fetch('/api/user').then(res => res.json())
//      .catch(error => console.error('Error:', error))
//      .then(response => console.log('Success:', response));

$.ajax({
    url:'/api/user',
    success:function(res) {
        console.log(res)
    }
})
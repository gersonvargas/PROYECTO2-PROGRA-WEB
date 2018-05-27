import axios from 'axios';

    const get_Jobs =  (metodo,referencia) => {
    var uri = window.encodeURI('https://jobs.github.com/positions.json');
    axios.get(uri)
        .then(function (response) {
            metodo(response.data,referencia);
        });
 } 

export default get_Jobs;

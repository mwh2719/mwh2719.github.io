export {headerInfo, footerCopyright};


let headerInfo = Vue.component('header-info',{
            template: "<p> This web application uses API's to give you multiple daily horoscopes. These horoscopes will be ordered based off there similarity to previously accurate horoscopes. You can then rate each horoscope yourself based off how accurately you feel it applies to you. this rating will then be saved and added to the collection in order to help create more accurate horoscopes over time.</p>"
});

let footerCopyright = Vue.component('footer-copyright', {
            template: "<footer style='text-align:center'>&copy; 2019 Mitchell Heard</footer>"
})
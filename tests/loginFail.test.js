const { Builder, By, until } = require('selenium-webdriver');

(async function loginFailTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        // Ir al login
        await driver.get('http://localhost:3000/login');

        // Credenciales incorrectas
        await driver.findElement(By.id('email')).sendKeys('wrong@test.com');
        await driver.findElement(By.id('password')).sendKeys('000000');

        // Click login
        await driver.findElement(By.id('loginBtn')).click();

      
        const error = await driver.wait(
            until.elementLocated(By.css('.alert-danger')),
            5000
        );

        console.log('✅ Login fallido detectado correctamente');

        
        console.log('Se mostró el error en pantalla');

    } catch (error) {
        console.log('❌ Error:', error);
        await driver.quit();
    }
})();
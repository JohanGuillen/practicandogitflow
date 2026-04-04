const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        // ===== IR AL LOGIN =====
        await driver.get('http://localhost:3000/login');

        await driver.findElement(By.id('email')).sendKeys('admin@test.com');
        await driver.findElement(By.id('password')).sendKeys('123456');

        await driver.findElement(By.id('loginBtn')).click();

        // 🔥 ESPERA SIMPLE (CLAVE)
        await driver.sleep(2000);

        // 🔥 VALIDAR QUE YA NO ESTÁ EN LOGIN
        const url = await driver.getCurrentUrl();

        if (!url.includes('/login')) {
            console.log('✅ Login exitoso');
        } else {
            console.log('❌ Login fallido');
        }

        // 👀 VER RESULTADO
        await driver.sleep(2000);

    } catch (error) {
        console.log('❌ Error:', error);
    } finally {
        await driver.quit();
    }
})();
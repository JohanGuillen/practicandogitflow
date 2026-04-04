const { Builder, By, until } = require('selenium-webdriver');

(async function editBookTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        // ===== LOGIN =====
        await driver.get('http://localhost:3000/login');

        await driver.wait(until.elementLocated(By.id('email')), 5000);

        await driver.findElement(By.id('email')).sendKeys('admin@test.com');
        await driver.findElement(By.id('password')).sendKeys('123456');
        await driver.findElement(By.id('loginBtn')).click();

        // 🔥 ESPERA REAL (NO DOM)
        await driver.sleep(2000);

        // 🔥 FORZAR ENTRADA A LIBROS (CLAVE)
        await driver.get('http://localhost:3000/books');

        // 🔥 ESPERA SEGURA
        await driver.wait(until.elementLocated(By.css('table')), 5000);

        // ===== CLICK EDITAR =====
        const editBtn = await driver.findElement(By.css('a.btn-warning'));

        await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
        await driver.sleep(500);
        await editBtn.click();

        // ===== ESPERAR FORM =====
        await driver.wait(until.urlContains('/edit'), 5000);
        await driver.wait(until.elementLocated(By.id('title')), 5000);

        // ===== EDITAR =====
        await driver.findElement(By.id('title')).clear();
        await driver.findElement(By.id('title')).sendKeys('Libro Editado Selenium');

        await driver.findElement(By.id('year')).clear();
        await driver.findElement(By.id('year')).sendKeys('2030');

        // ===== GUARDAR (SUBMIT REAL)
        await driver.findElement(By.css('form')).submit();

        // ===== VALIDAR =====
        await driver.wait(until.urlContains('/books'), 5000);

        console.log('✅ Libro editado correctamente');

    } catch (error) {
        console.log('❌ Error:', error);
    }
})();
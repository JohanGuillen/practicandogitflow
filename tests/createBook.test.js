const { Builder, By, until } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver/lib/select');

(async function createBookTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().window().maximize();

        // ===== LOGIN =====
        await driver.get('http://localhost:3000/login');

        await driver.wait(until.elementLocated(By.id('email')), 5000);
        await driver.findElement(By.id('email')).sendKeys('admin@test.com');
        await driver.findElement(By.id('password')).sendKeys('123456');
        await driver.findElement(By.id('loginBtn')).click();

        await driver.wait(until.elementLocated(By.css('.navbar')), 5000);

        // ===== IR A LIBROS =====
        await driver.get('http://localhost:3000/books');

        // 🔥 ESPERAR BOTÓN CREAR
        const crearBtn = await driver.wait(
            until.elementLocated(By.linkText('Crear Libro')),
            5000
        );

        await crearBtn.click();

        // ===== ESPERAR FORM =====
        await driver.wait(until.elementLocated(By.id('title')), 5000);

        // ===== LLENAR FORM =====
        await driver.findElement(By.id('title')).sendKeys('Libro Selenium');
        await driver.findElement(By.id('year')).sendKeys('2025');

        // ===== SELECTS =====
        const author = new Select(await driver.findElement(By.id('author')));
        await author.selectByIndex(1);

        const category = new Select(await driver.findElement(By.id('category')));
        await category.selectByIndex(1);

        const editorial = new Select(await driver.findElement(By.id('editorial')));
        await editorial.selectByIndex(1);

        // ===== GUARDAR =====
        const saveBtn = await driver.findElement(By.id('saveBtn'));
        await saveBtn.click();

        // 🔥 ESPERAR QUE REGRESE AL LISTADO
        await driver.wait(until.urlContains('/books'), 5000);

        console.log('✅ Libro creado correctamente');

        console.log('Navegador abierto para ver resultado');

    } catch (error) {
        console.log(' Error:', error);
        await driver.quit();
    }
})();
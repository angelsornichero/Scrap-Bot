const { chromium } = require('playwright')

const shops3070 = [
    
    {
        vendor: 'PcComponentes',
        url: 'https://www.pccomponentes.com/tarjetas-graficas/geforce-rtx-3070-series',
        checkPrice: async({ page }) => {
            
            const minimunPrice = await page.inputValue('[aria-label="minimum"]')
            const maxPrice = await page.inputValue('[aria-label="maximum"]')
            const priceMedium = (minimunPrice + maxPrice)/2
            const priceRate = `Minimum: ${minimunPrice} | Middle: ${priceMedium} | Maximum: ${maxPrice}`
            return priceRate
        }
    },
    {
        vendor: 'Nvidia',
        url: 'https://store.nvidia.com/es-es/geforce/store/gpu/?page=1&limit=9&locale=es-es&category=GPU&gpu=RTX%203070&gpu_filter=RTX%203090%20Ti~5,RTX%203090~16,RTX%203080%20Ti~9,RTX%203080~15,RTX%203070~10,RTX%203070%20Ti~2,RTX%203060%20Ti~7,RTX%203060~16,RTX%203050%20Ti~0,RTX%203050~3,RTX%202070~0,RTX%202060%20SUPER~3,RTX%202060~8,GTX%201660%20Ti~6,GTX%201660%20SUPER~15,GTX%201660~5,GTX%201650%20Ti~0,GTX%201650%20SUPER~2,GTX%201650~25',
        checkPrice: async({ page }) => {
            
            const content = await page.textContent('[class="stock-grey-out link-btn i-423"]')
            if (content === 'AGOTADO') {
                const stock = `No hay founders😢`
                return stock
            } else {
                const stock = `HAY FOUNDERS EDITION!!!!!!! 🍾🍾`
                return stock
            }

            
        }
    },
    
    {
        vendor: 'Amazon -> Nvidia',
        url: 'https://www.amazon.es/NVIDIA-GeForce-RTX-3070-plateado/dp/B08MYCN952/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1NMUQ23OTKUT3&keywords=3070+rtx&qid=1656426634&sprefix=3070+rtx%2Caps%2C132&sr=8-2',
        checkPrice: async({ page }) => {
            await page.click('[id="sp-cc-accept"]')
            const content = await page.textContent('[class="a-size-medium a-color-success"]')
            console.log(content) 
            if (content.includes('En stock.')) {
                
                const stock = `HAY FOUNDERS EDITION!!!!!!!🍾🍾`
                return stock

            } else {
            
                const stock = `No hay founders 😢`
                return stock
            }

            
        }
    },
    
    {
        vendor: 'PcBox',
        url: 'https://www.pcbox.com/componentes-de-ordenador/tarjetas-graficas/geforce-rtx-3070?initialMap=c,c&initialQuery=componentes-de-ordenador/tarjetas-graficas&map=category-1,category-2,procesador-grafico&order=OrderByPriceASC',
        checkPrice: async({ page }) => {
            await page.click('[title="close form"]')
            await page.click('[id="cookiescript_accept"]')
            const minimunPrice = await page.textContent('[class="vtex-slider__left-value t-small c-muted-1"]')
            const maxPrice = await page.textContent('[class="vtex-slider__right-value t-small c-muted-1"]')
            const priceMedium = (minimunPrice + maxPrice)/2
            const priceRate = `Minimum: ${minimunPrice} | Middle: ${priceMedium} | Maximum: ${maxPrice}`
            return priceRate
        }
    }
]



;( async () => {
    const browser = await chromium.launch({ headless: false })
    
    for (const shop3070 of shops3070) {
        const { checkPrice, vendor, url } = shop3070
        const page = await browser.newPage()
        await page.goto(url)
        const price = await checkPrice({ page })
        
        console.log(`vendor: ${vendor}, model: RTX3070, prices or stock: ${price}`)
        await page.screenshot({ path: `screenshots/${vendor}:3070.png`})
        await page.close()
    }



    await browser.close()

}


)()


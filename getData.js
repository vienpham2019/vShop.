fetch('https://api.nike.com/cic/browse/v1?queryid=products&anonymousId=DFC1328A58CDFFF8DFC538EECA55FF0F&country=us&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(US)%26filter%3Dlanguage(en)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(cd7ee063-a9d4-43ea-a126-ef74582fdb7f%2C7baf216c-acc6-4452-9e07-39c2ca77ba32)%26anchor%3D24%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en&localizedRangeStr=%7BlowestPrice%7D%20%E2%80%94%20%7BhighestPrice%7D')
.then(res => res.json())
.then(data => {
    data.data.products.products.forEach(value => {
        sortData(value)
    })
})

const sortData = data  => {
    let {colorways , price , subtitle , title } = data 
    let { currentPrice , fullPrice , discounted } = price  
    let colors = colorways.map(item  => ({color: item.colorDescription.split('/')[0] , img: item.images.portraitURL}))
    let [ sale_price , current_price , isSale  , category] = [currentPrice , fullPrice , discounted , subtitle]
    let img = colors[0].img
    let brand = 'Nike'
    let isNew = false 
    let reviews = []
    let season = ''
    // let sizes = ['6','6.5','7','7.5','8','8.5','9','10','11','12','13']
    let sizes = ['2XS','XS','S','M','L','XL','2XL']
    // let sizes = []

    let complete_data = {title , current_price , sale_price , sizes , isNew , isSale , colors , img , category , season , brand , reviews}
    console.log(complete_data)
    let Obtion = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(complete_data)
    }
    fetch('http://localhost:3000/Dresses' , Obtion)
    .then(res => res.json())
    .then(data => console.log(data))
}
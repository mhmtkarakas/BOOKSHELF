import axios from "axios";  // Bu sekilde api ve urls dosyasi acmamizin nedeni kod yazarken hata yapmayi onlemek
                            // kullanacagimiz dosya ya import edip kullanabiliriz
const api = axios.create({
    baseURL:"http://localhost:3004"
})

export default api
<h1 align="center">
  <p align="center">HousePriceDashboard</p>
  <a href="https://computervisiontemplate.herokuapp.com/"><img src="https://upload.cc/i1/2023/02/08/yluw0p.png" alt="app"></a>

## About

大四資料探勘課程，以實價登陸資料作為主題，進行分析。我們選擇以隨機森林、類神經網路對資料進行預測，並以 MAPE 比較其預測結果。同時自行建置資料庫並以 React 完成視覺化網頁。

專案以內政部實價登陸公布之交易紀錄，實現六都房價走勢儀表板。以隨機森林創建預測模型，針對房價進行預測，分析六都差異。

報告書：[六都房價預測與分析](https://1drv.ms/b/s!AiTjghiuXYI5ymtoZSoMJyWt-ZZu?e=AvylMZ)

Dashboard：https://taiwanhouseprice.herokuapp.com/

#### 前端佈局

此專案使用 [yarn](https://yarnpkg.com/) 套件管理工具。

1. **首頁 Dashboard**
   網站以 [React](https://zh-hant.reactjs.org/) 前端框架建構，底層語言為 Javascript。首頁展示六都最新一期的房價即時資訊，以及當月與前月的房價月增率。也提供詳細近年六房房價趨勢圖，同時比較同時間、不同縣市間的房價走勢是否也存在差異。

2. **次頁 House Price**
   第二頁佈局安排，以表單的形式並串接 API，當使用者送出預測資料時，便會即時返回預測結果。同時使用者的預測資料會同時進入資料庫，並以圖表呈現。進一步分析使用者的行為。

#### 後端

利用 [R studio](https://posit.co/download/rstudio-desktop/) 完成資料清理後，將資料存入 MongoDB 資料庫。

以 Python Flask 撰寫 API，當資料傳入 API 時，後端會將資料進行轉換後，輸入預先載好的模型裡，並儲存模型返回的預測值，並將數值回傳。

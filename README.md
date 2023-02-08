<h1 align="center">
  <p align="center">HousePriceDashboard</p>
  <a href="https://computervisiontemplate.herokuapp.com/"><img src="https://upload.cc/i1/2023/02/08/yluw0p.png" alt="app"></a>

## About

以內政部實價登陸公布隻交易紀錄，實現六都房價走勢儀表板，並且以隨機數森林創建預測模型，針對房價做預測。亦提供嚴謹的統計檢定結果，分析六都差異。

此專案前端以 [React](https://zh-hant.reactjs.org/)框架完成。

後端以

與 [tensorflow](https://www.tensorflow.org/js?hl=zh-tw) 套件完成。以 React 的`react-webcam`套件，抓取即時影像，透過 tensorflow 模型針對影像進行偵測，使用 `COCO-SSD` 模型，至少可分類 80 樣物品。

專案已部屬至 Heroku：https://computervisiontemplate.herokuapp.com/

參考來源：[tensorflow-models/coco-ssd](https://www.npmjs.com/package/@tensorflow-models/coco-ssd)

## Getting Started

此專案使用 [yarn](https://yarnpkg.com/) 套件管理工具。

### Frontend

在開發模式下運行此應用程序。在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000) 即可查看。

```
cd frontend

yarn install  // 下載 package.json 中所有的依賴項。
yarn start
```

下載 `package.json` 中所有的依賴項。

### Backend

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
import os


def getDummy(_dataset):
    _dataset = pd.get_dummies(_dataset)
    return _dataset


def selectValuesX(_dataset):
    _dataset = _dataset.loc(
        axis=1)["建物移轉總面積平方公尺", "建物現況格局-房", "建物現況格局-廳", "建物現況格局-廳"]
    return _dataset


def cleanDataAppendX(_path):
    print(len(os.listdir(_path)))
    file_name = '111-{} tp.csv'
    df_list = []
    for i in range(1, len(os.listdir(_path))):
        df_list.append(pd.read_csv("./data/" + file_name.format(i)))

    removeCol = ["非都市土地使用分區", "非都市土地使用編定", "車位移轉總面積(平方公尺)", "備註", "編號", "移轉編號"]
    selectRemove = ["土地位置建物門牌", "都市土地使用分區", "交易筆棟數", "交易標的", "車位類別", "移轉層次", "總樓層數",
                    "主要建材", "交易年月日", "建築完成年月", "單價元平方公尺", "總價元"]
    dataset = pd.concat(df_list)
    dataset = dataset.drop(1, axis=0)
    dataset = dataset.drop(removeCol, axis=1)
    dataset = dataset.drop(selectRemove, axis=1)
    dataset = dataset[dataset["主要用途"] == "住家用"]
    dataset = dataset.dropna()
    dataset = dataset.reset_index(drop=True)
    dataset = dataset.astype({"土地移轉總面積平方公尺": "float", "建物移轉總面積平方公尺": "float",
                              "建物現況格局-房": "float", "建物現況格局-廳": "float", "建物現況格局-衛": "float",
                              "車位總價元": "float", "主建物面積": "float", "附屬建物面積": "float", "陽台面積": "float"})
    dataset = selectValuesX(dataset)
    dataset = getDummy(dataset)
    return dataset


def cleanDataAppendY(_path):
    target_path = _path
    file_name = '111-{} tp.csv'
    df_list = []
    for i in range(1, len(os.listdir(target_path))):
        df_list.append(pd.read_csv("./data/" + file_name.format(i)))

    removeCol = ["非都市土地使用分區", "非都市土地使用編定", "車位移轉總面積(平方公尺)", "備註", "編號", "移轉編號"]
    selectRemove = ["土地位置建物門牌", "都市土地使用分區", "交易筆棟數", "交易標的", "車位類別", "移轉層次", "總樓層數",
                    "主要建材", "交易年月日", "建築完成年月", "單價元平方公尺"]
    dataset = pd.concat(df_list)
    dataset = dataset.drop(1, axis=0)
    dataset = dataset.drop(removeCol, axis=1)
    dataset = dataset.drop(selectRemove, axis=1)
    dataset = dataset[dataset["主要用途"] == "住家用"]
    dataset = dataset.dropna()
    dataset = dataset.reset_index(drop=True)
    dataset = dataset["總價元"].astype(float).values.reshape(len(dataset), 1)
    return dataset

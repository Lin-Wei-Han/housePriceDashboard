library(tidyverse)
dataset = list()
loc = "/home/chanyu/Desktop/school/DataMining/dataset/"
city = c("tp", "tc", "tn", "ks", "nt", "ty")
for(y in 1:11) {
  if (y == 1) {
    for (c in city) {
      file = paste0("101", "-4 ", c)
      dataset[[file]] = read.csv(paste0(loc, file, ".csv"))
    }
  } else if (y == 11) {
    for (s in 1:3) {
      for (c in city) {
        file = paste0("1", y, "-", s, " ", c)
        dataset[[file]] = read.csv(paste0(loc, file, ".csv"))
      }
    }
  } else {
    for (s in  1:4) {
      for (c in city) {
        file = ifelse(y < 10,
                      paste0("10", y, "-", s, " ", c),
                      paste0("1", y, "-", s, " ", c)
        )
        dataset[[file]] = read.csv(paste0(loc, file, ".csv"))
      }
    }
  }
}

for (i in 1:length((dataset))) {
  data <- dataset[[i]] %>%
    select(-c(
      非都市土地使用分區, 
      非都市土地使用編定, 
      車位移轉總面積.平方公尺., 
      主要建材, 備註, 編號, 
      移轉編號)) %>%
    filter(主要用途 == "住家用") %>%
    mutate(電梯 = ifelse(is.na(電梯), 0, 電梯))
  loc = paste0("/home/chanyu/Desktop/school/DataMining/project/dataset/dataset/", 
               names(dataset[i]), ".csv")
  write.csv(data, loc)
}

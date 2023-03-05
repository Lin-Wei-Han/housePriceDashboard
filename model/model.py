from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import cleanData as cleanData
import joblib

houseTradeTaipei_111_X = cleanData.cleanDataAppendX("./data/")
houseTradeTaipei_111_Y = cleanData.cleanDataAppendY("./data/")

X_train, X_test, y_train, y_test = train_test_split(
    houseTradeTaipei_111_X, houseTradeTaipei_111_Y, test_size=1/3, random_state=0)

# Create Random Forest Regression Model
randomForestModel = RandomForestClassifier(
    n_estimators=10, criterion='gini', max_depth=9)

# Use Model To Train Data
randomForestModel.fit(X_train, y_train)

# Use Model To Predict Test Data
predicted = randomForestModel.predict(X_test)

print('RMSE：', metrics.mean_squared_log_error(y_test, predicted))

joblib.dump(randomForestModel, 'RF_model.joblib')

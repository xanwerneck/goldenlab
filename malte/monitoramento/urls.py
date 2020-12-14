from django.urls import path
from monitoramento import views
from monitoramento import api

urlpatterns = [
 path('', views.home),
 path('api/image', api.MonitoramentoApi.as_view())
]
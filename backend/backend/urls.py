from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from polls.views import PollViewSet

router = DefaultRouter()
router.register('polls', PollViewSet, basename='polls')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]

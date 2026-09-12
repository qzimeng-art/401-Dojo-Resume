from django.contrib import admin
from .models import Application, ApplicationFile, Review, MasterResume

admin.site.register(Application)
admin.site.register(ApplicationFile)
admin.site.register(Review)
admin.site.register(MasterResume)
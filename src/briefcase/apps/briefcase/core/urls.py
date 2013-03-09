#core urls
from django.conf.urls import patterns, include, url



urlpatterns = patterns('',
    url(r'^', include('briefcase.apps.briefcase.core.accounts.urls')),
    url(r'^spreadsheet/', include('briefcase.apps.briefcase.core.spreadsheet.urls')),
    url(r'^delete/', 'briefcase.apps.briefcase.core.views.delete'),
    url(r'^rename/','briefcase.apps.briefcase.core.views.rename'),

    )

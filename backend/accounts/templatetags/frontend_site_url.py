"""Custom Django template"""

from django import template

register = template.Library()


@register.filter(name="frontend_site_url")
def frontend_site_url(request, port):
    """filter for retrieving request frontend on port=`port`
    Used for `site_url` in `base.html` template"""
    port_index = request.build_absolute_uri().rindex(':')
    return f"{request.build_absolute_uri()[:port_index]}:{port}/"

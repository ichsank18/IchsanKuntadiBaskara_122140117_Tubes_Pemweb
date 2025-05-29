# __init__.py

from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.response import Response
from pyramid.authorization import ACLAuthorizationPolicy
from .routes import includeme as routes_includeme
from .views import auth, tasks

def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
        return response
    event.request.add_response_callback(cors_headers)

def options_view(request):
    # untuk menangani preflight
    return Response(status=204)

def main(global_config, **settings):
    config = Configurator(settings=settings)
    
    
    config.add_route('options_all', '/{path:.*}')
    config.add_route('home', '/')

    config.add_view(options_view, route_name='options_all', request_method='OPTIONS')

    
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)
    
    
    config.include('pyramid_jinja2')
    config.include('pyramid_tm')
    config.include('.models')
    config.include('.routes')
    

    from .views import auth, tasks
    config.include(auth.includeme)
    config.include(tasks.includeme)

    config.include(routes_includeme)

    config.include(routes_includeme)
    
    config.add_static_view(name='static', path='taskmate_backend:static', cache_max_age=3600)

    config.scan()
    

    
    return config.make_wsgi_app()

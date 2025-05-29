from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import NO_PERMISSION_REQUIRED
from sqlalchemy.exc import SQLAlchemyError

from ..models.mymodel import User

@view_config(route_name='home', renderer='taskmate_backend:templates/mytemplate.jinja2',
             permission=NO_PERMISSION_REQUIRED)
def my_view(request):
    try:
        query = request.dbsession.query(User)
        one = query.first()
    except SQLAlchemyError:
        return Response(db_err_msg, content_type='text/plain', status=500)

    return {'one': one.name if one else 'No user', 'project': 'taskmate_backend'}

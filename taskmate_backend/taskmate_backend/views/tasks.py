from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models.mymodel import Task, User
import json

@view_config(route_name='tasks', renderer='json', request_method='GET')
def list_tasks(request):
    try:
        tasks = request.dbsession.query(Task).all()
        return [{"id": t.id, "title": t.title, "user_id": t.user_id} for t in tasks]
    except DBAPIError:
        return Response(json.dumps({"error": "Database Error"}), content_type='application/json', status=500)

@view_config(route_name='create_task', renderer='json', request_method='POST')
def create_task(request):
    data = request.json_body
    task = Task(title=data['title'], user_id=data['user_id'])
    request.dbsession.add(task)
    return {"message": "Task berhasil dibuat", "task_id": task.id}

@view_config(route_name='update_task', renderer='json', request_method='PUT')
def update_task(request):
    id = int(request.matchdict['id'])
    data = request.json_body
    task = request.dbsession.query(Task).get(id)
    if not task:
        return Response(json.dumps({"error": "Task tidak ditemukan"}), content_type='application/json', status=404)
    task.title = data['title']
    return {"message": "Task berhasil diupdate"}

@view_config(route_name='delete_task', renderer='json', request_method='DELETE')
def delete_task(request):
    id = int(request.matchdict['id'])
    task = request.dbsession.query(Task).get(id)
    if not task:
        return Response(json.dumps({"error": "Task tidak ditemukan"}), content_type='application/json', status=404)
    request.dbsession.delete(task)
    return {"message": "Task berhasil dihapus"}

def includeme(config):
    config.add_view(list_tasks, route_name='tasks', renderer='json', request_method='GET')
    config.add_view(create_task, route_name='create_task', renderer='json', request_method='POST')
    config.add_view(update_task, route_name='update_task', renderer='json', request_method='PUT')
    config.add_view(delete_task, route_name='delete_task', renderer='json', request_method='DELETE')

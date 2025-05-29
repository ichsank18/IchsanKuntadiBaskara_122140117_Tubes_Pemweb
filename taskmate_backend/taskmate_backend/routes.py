def includeme(config):
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.add_route('tasks', '/api/tasks')
    config.add_route('create_task', '/api/tasks')
    config.add_route('update_task', '/api/tasks/{id}')
    config.add_route('delete_task', '/api/tasks/{id}')

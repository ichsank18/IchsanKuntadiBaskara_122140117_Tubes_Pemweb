# auth.py
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError, DBAPIError
from ..models.mymodel import User
from ..security import hash_password  # pastikan fungsi ini ada
import hashlib
import json

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    try:
        print("==> REGISTER REQUEST MASUK")
        data = request.json_body
        print("==> DATA:", data)

        user = User(
            name=data['name'],
            email=data['email'],
            password_hash=hash_password(data['password'])
        )
        request.dbsession.add(user)
        request.dbsession.flush()
        return Response(
            json.dumps({"message": "Registrasi berhasil"}),
            content_type="application/json",
            status=200
        )
    except IntegrityError:
        request.dbsession.rollback()
        return Response(json_body={"message": "Email sudah digunakan"}, status=400)
    except Exception as e:
        print("==> ERROR:", str(e))
        request.dbsession.rollback()
        return Response(json_body={"message": str(e)}, status=500)

    
@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    try:
        data = request.json_body
        email = data.get('email')
        password = data.get('password')

        user = request.dbsession.query(User).filter_by(
            email=email,
            password_hash=hash_password(password)
        ).first()

        if user:
            # Simulasi token manual (bisa pakai session / simpan user_id sementara)
            return {"status": "success", "user_id": user.id}
        else:
            return Response(
                json.dumps({"status": "fail", "msg": "Invalid credentials"}),
                content_type='application/json',
                status=401
            )

    except DBAPIError:
        return Response(
            json.dumps({"status": "fail", "msg": "DB Error"}),
            content_type='application/json',
            status=500
        )

def includeme(config):
    config.add_view(register_view, route_name='register', renderer='json', request_method='POST')
    config.add_view(login_view, route_name='login', renderer='json', request_method='POST')

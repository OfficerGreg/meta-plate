from flask import Blueprint, jsonify, session, request

from models import User, Modul, db

modul_bp = Blueprint("modul", __name__)

# create new modul route for all users that aren't admin
@modul_bp.route("/modul/create", methods=["POST"])
def create_modul():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401

    current_user = User.query.filter_by(id=user_id).first()

    if current_user.is_admin:
        modul_name = request.json.get("name")
        users = User.query.filter_by(is_admin=False).all()

        for user in users: 
            user.add_modul(modul_name)

        return jsonify({"message": "Modul created successfully."})
    
    return jsonify({"error": "unauthorized"}), 401

# add zp grade to modul
@modul_bp.route("/modul/add_zp/<int:user_id>", methods=["POST"])
def add_zp(user_id):
    current_user_id = session.get("user_id")


    current_user = User.query.filter_by(id=current_user_id).first()

    if current_user.is_admin:
        modul_name = request.json.get("name")
        zp = request.json.get("zp")
        user = User.query.filter_by(id=user_id).first()

        user.add_zp(modul_name, zp)

        return jsonify({"message": "ZP grade added successfully."})
    
    return jsonify({"error": "unauthorized"}), 401


# add lb grade to modul
@modul_bp.route("/modul/add_lb/<int:user_id>", methods=["POST"])
def add_lb(user_id):
    current_user_id = session.get("user_id")

    current_user = User.query.filter_by(id=current_user_id).first()

    if current_user.is_admin:
        modul_name = request.json.get("name")
        lb = request.json.get("lb")
        user = User.query.filter_by(id=user_id).first()

        user.add_lb(modul_name, lb)

        return jsonify({"message": "LB grade added successfully."})
    
    return jsonify({"error": "unauthorized"}), 401

# add teacher to modul
@modul_bp.route("/modul/add_teacher", methods=["POST"])
def add_teacher():
    current_user_id = session.get("user_id")

    if not current_user_id:
        return jsonify({"error": "unauthorized"}), 401

    current_user = User.query.filter_by(id=current_user_id).first()

    if current_user.is_admin:
        modul_name = request.json.get("name")
        teacher = request.json.get("teacher")
        users = User.query.filter_by(is_admin=False).all()

        for user in users: 
            modul = Modul.query.filter_by(name=modul_name, user=user).first()
            if modul:
                modul.teacher = teacher

        db.session.commit()

        return jsonify({"message": "Teacher added successfully."})
    
    return jsonify({"error": "unauthorized"}), 401


# get all moduls for current user
@modul_bp.route("/modul/get_all", methods=["GET"])
def get_all_moduls():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "unauthorized"}), 401


    user = User.query.filter_by(id=user_id).first()

    moduls = user.get_modules()

    return jsonify({
        "moduls": [
            {"name": modul.name, "zp": modul.zp_grade, "lb": modul.lb_grade, "teacher": modul.teacher} for modul in moduls
        ]
    })
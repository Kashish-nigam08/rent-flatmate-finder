from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.chat_message import ChatMessage
from app.websocket.connection_manager import manager

router = APIRouter(tags=["WebSocket Chat"])


@router.websocket("/ws/chat/{user_id}")
async def websocket_chat(websocket: WebSocket, user_id: int):

    await manager.connect(user_id, websocket)

    db: Session = SessionLocal()

    try:

        while True:

            data = await websocket.receive_json()

            receiver_id = data["receiver_id"]

            message = data["message"]

            # Save message in database
            chat = ChatMessage(
                sender_id=user_id,
                receiver_id=receiver_id,
                message=message
            )

            db.add(chat)
            db.commit()

            # Send message to receiver if online
            await manager.send_personal_message(
                receiver_id,
                f"User {user_id}: {message}"
            )

    except WebSocketDisconnect:

        manager.disconnect(user_id)

    finally:

        db.close()
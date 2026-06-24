from fastapi import WebSocket
from typing import Dict, List, Set
import asyncio
import json
import logging

logger = logging.getLogger(__name__)

class SignalingManager:
    def __init__(self):
        # Maps roomId -> Set of (websocket, client_id)
        self.rooms: Dict[str, Set[tuple]] = {}

    async def connect(self, websocket: WebSocket, room_id: str, client_id: str):
        await websocket.accept()
        if room_id not in self.rooms:
            self.rooms[room_id] = set()
        self.rooms[room_id].add((websocket, client_id))
        logger.info(f"Client {client_id} connected to room {room_id}")
        
        # Notify others in the room that a new peer joined
        await self.broadcast(
            room_id=room_id,
            message={"type": "peer_joined", "sender": client_id},
            exclude_client=client_id
        )

    async def disconnect(self, websocket: WebSocket, room_id: str, client_id: str):
        if room_id in self.rooms:
            # Find and remove client
            self.rooms[room_id] = {item for item in self.rooms[room_id] if item[1] != client_id}
            if not self.rooms[room_id]:
                del self.rooms[room_id]
        logger.info(f"Client {client_id} disconnected from room {room_id}")
        
        # Notify others in the room that the peer left
        await self.broadcast(
            room_id=room_id,
            message={"type": "peer_left", "sender": client_id},
            exclude_client=client_id
        )

    async def broadcast(self, room_id: str, message: dict, exclude_client: str = None):
        if room_id not in self.rooms:
            return
        
        message_str = json.dumps(message)
        dead_connections = set()
        
        for websocket, client_id in self.rooms[room_id]:
            if client_id == exclude_client:
                continue
            try:
                await websocket.send_text(message_str)
            except Exception as e:
                logger.error(f"Failed to send message to client {client_id}: {e}")
                dead_connections.add((websocket, client_id))
                
        # Clean up any dead connections
        for dead in dead_connections:
            try:
                self.rooms[room_id].remove(dead)
            except KeyError:
                pass
        if room_id in self.rooms and not self.rooms[room_id]:
            del self.rooms[room_id]

signaling_manager = SignalingManager()

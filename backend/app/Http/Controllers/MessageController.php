<?php

namespace App\Http\Controllers;

use App\Models\ChatMessages;
use App\Models\ChatRoom;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getAllMessages()
    {
        $messages = ChatMessages::all();
        return response()->json([
            'messages' => $messages
        ])->header('Access-Control-Allow-Origin', '*');
    }
    public function createMessage(Request $request)
    {
        if (is_null($request->input('senderId')) || is_null($request->input('content')) || is_null($request->input('receiverId'))) {
            throw new Exception('Both userId and content and roomId are required.', 400);
        }
        $senderId = $request->input('senderId');
        $content = $request->input('content');
        $receiverId = $request->input('receiverId');
        $user = User::where('id', $senderId)->first();
        if (!$user) {
            return response()->json([
                'error' => "User doesn't exist"
            ]);
        }
        $message = new ChatMessages;
        $message->sender_id = $senderId;
        $message->content = $content;
        $message->receiver_id = $receiverId;
        $message->save();
        return response()->json(['message' => "Message created"])
            ->header('Access-Control-Allow-Origin', '*');
    }
    public function getUsersMessages(Request $req)
    {
        //userid => bdi jib kl l messages
        //we get the userid from the token
        $user = Auth::user(); //authenticated user 
        $userId = $user->id;
        $receiver = $req->receiverId;
        $senderMessages = ChatMessages::where('sender_id', $userId)->where('receiver_id', $receiver)->get(); //get all
        $receiverMessages = ChatMessages::where('receiver_id', $userId)->where('sender_id', $receiver)->get(); //get all
        $allMessages = $senderMessages->merge($receiverMessages);
        $allMessagesSorted = $allMessages->sortBy('created_at')->values();
        // $messages=$user->sentMessages;
        return response()->json([
            // 'sender messages'=>$senderMessages,
            // 'receiver messages'=>$receiverMessages,
            // 'all messages'=>$allMessages,
            'sorted messages' => $allMessagesSorted
        ])->header('Access-Control-Allow-Origin', '*');
    }
}

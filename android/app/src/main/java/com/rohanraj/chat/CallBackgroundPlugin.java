package com.rohanraj.chat;

import android.content.Intent;
import android.os.Build;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CallBackground")
public class CallBackgroundPlugin extends Plugin {

    @PluginMethod
    public void start(PluginCall call) {
        String type = call.getString("callType", "audio");

        Intent intent = new Intent(getContext(), CallService.class);
        intent.putExtra("callType", type);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getContext().startForegroundService(intent);
        } else {
            getContext().startService(intent);
        }

        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Intent intent = new Intent(getContext(), CallService.class);
        intent.setAction("STOP");
        getContext().startService(intent);
        call.resolve();
    }
}

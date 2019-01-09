package com.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.reactnative.camera.RNCameraPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.mapbox.rctmgl.RCTMGLPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.mapbox.rctmgl.RCTMGLPackage;
import org.reactnative.camera.RNCameraPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new RNCameraPackage(),
            new BlurViewPackage(),
            new VectorIconsPackage(),
            new RNTextSizePackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeConfigPackage(),
            new RCTMGLPackage(),
            new VectorIconsPackage(),
            new RNTextSizePackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeConfigPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeConfigPackage(),
            new RNTextSizePackage(),
            new VectorIconsPackage(),
          new SvgPackage(),
          new BlurViewPackage(),
          new RCTMGLPackage(),
          new RNCameraPackage(),
          new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

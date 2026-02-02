import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, forwardRef, useImperativeHandle } from "react";

// Using hCaptcha test site key - replace with your own in production
const HCAPTCHA_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001";

export interface CaptchaRef {
  reset: () => void;
  execute: () => void;
}

interface CaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
}

const Captcha = forwardRef<CaptchaRef, CaptchaProps>(
  ({ onVerify, onExpire, onError }, ref) => {
    const captchaRef = useRef<HCaptcha>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        captchaRef.current?.resetCaptcha();
      },
      execute: () => {
        captchaRef.current?.execute();
      },
    }));

    return (
      <div className="flex justify-center">
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
        />
      </div>
    );
  }
);

Captcha.displayName = "Captcha";

export default Captcha;

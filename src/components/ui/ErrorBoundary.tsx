import { Component, ErrorInfo, ReactNode } from 'react';
import { Mascot } from './Mascot';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Antigravity Caught ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
          <Mascot size={96} mood="offside" />

          <div className="font-pixel text-4xl text-[#FF007F] mt-4 blink-retro">
            SYSTEM PAUSE // '90
          </div>

          <h1 className="font-display text-2xl sm:text-3xl text-[#FFE500] mt-2">
            عفواً.. حصل خطأ غير متوقع في الملعب! 🚩
          </h1>

          <p className="font-body text-paper-cream/80 text-sm max-w-md mt-2">
            الحكم صفر لوجود خطأ فني أثناء تحميل الصفحة. اضغط بالأسفل لإعادة تشغيل المباراة أو العودة للرئيسية فوراً.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 bg-[#25F143] text-[#090A0F] font-display text-base font-bold border-[2px] border-black shadow-[var(--shadow-x)_3px_0_#0E4218] hover:translate-y-[-2px] active:translate-y-0"
            >
              🔄 إعادة تحميل الصفحة
            </button>

            <button
              onClick={this.handleGoHome}
              className="px-5 py-2.5 bg-[#FFE500] text-[#090A0F] font-display text-base font-bold border-[2px] border-black shadow-[var(--shadow-x)_3px_0_#998A00] hover:translate-y-[-2px] active:translate-y-0"
            >
              ⚽ العودة للرئيسية
            </button>
          </div>

          {this.state.error && (
            <div className="mt-8 max-w-lg w-full text-start bg-black/80 border border-white/20 p-3 text-[11px] font-mono text-red-400 overflow-x-auto">
              <span className="text-[#FFE500] font-bold block mb-1">تفاصيل الخطأ التقني (Debug):</span>
              {this.state.error.message || String(this.state.error)}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

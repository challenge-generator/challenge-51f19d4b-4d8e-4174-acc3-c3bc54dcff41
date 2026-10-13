import { Component, Input, ChangeDetectionStrategy, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="hasError()" 
      class="error-container" 
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div class="error-icon" aria-hidden="true">!</div>
      <div class="error-content">
        <span class="error-message">{{ errorMessage() }}</span>
        <button 
          *ngIf="dismissible" 
          class="dismiss-button" 
          (click)="dismiss()"
          aria-label="Cerrar mensaje de error">
          ×
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background-color: #fff5f5;
      border: 1px solid #fc8181;
      border-radius: 8px;
      margin: 8px 0;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: #e53e3e;
      color: white;
      font-weight: bold;
      border-radius: 50%;
      flex-shrink: 0;
      font-size: 14px;
    }

    .error-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 8px;
    }

    .error-message {
      color: #c53030;
      font-size: 14px;
      line-height: 1.5;
      word-break: break-word;
    }

    .dismiss-button {
      background: none;
      border: none;
      color: #c53030;
      font-size: 20px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .dismiss-button:hover {
      opacity: 1;
    }

    .dismiss-button:focus {
      outline: 2px solid #e53e3e;
      outline-offset: 2px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() set error(value: string | null | undefined) {
    this._error.set(value ?? null);
  }

  @Input() dismissible = true;

  @Input() set visible(value: boolean) {
    this._visible.set(value);
  }

  private readonly _error: Signal<string | null> = signal(null);
  private readonly _visible: Signal<boolean> = signal(true);

  readonly errorMessage: Signal<string> = computed(() => this._error() ?? '');

  readonly hasError: Signal<boolean> = computed(
    () => this._visible() && !!this._error()
  );

  readonly dismiss = (): void => {
    this._visible.set(false);
  };

  readonly show = (): void => {
    this._visible.set(true);
  };
}

function signal<T>(value: T): Signal<T> {
  return { value } as Signal<T>;
}
import { DomainEvent } from "@pra/domain";

type Handler = (event: DomainEvent) => void | Promise<void>;

export class EventBus {
  private handlers = new Map<DomainEvent["type"], Handler[]>();

  on<T extends DomainEvent["type"]>(type: T, handler: Handler): void {
    const list = this.handlers.get(type) ?? [];
    list.push(handler);
    this.handlers.set(type, list);
  }

  async emit(event: DomainEvent): Promise<void> {
    const list = this.handlers.get(event.type) ?? [];
    await Promise.all(list.map((h) => h(event)));
  }
}
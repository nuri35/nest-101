import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EveryEventSubscriber implements EntitySubscriberInterface<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeInsert(event: InsertEvent<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInsert(event: InsertEvent<any>) {
    // örnegin senaryo olarak her crud işlemlerdeki ekleme silme güncelleme işlemlerinde loglama yapmak istiyoruz ve bunları veritabanına kaydetmek istiyoruz diyelim. burada  user.log.entity tablosuna örnegin kaydetme işlemi olabilir. ben burda örnek olması amacıyla paylaşmak istedim. bizim senaryoda böyle bir şey olmadıgı için yazmadım.. içergini. bu snearyoyu afterUpdate içinde uygulayabilriz. böylelikle decerators'lardan yararlanmış oluruz.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterUpdate(event: UpdateEvent<any>) {}
}

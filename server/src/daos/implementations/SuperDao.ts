import { logger } from '../../utils';

export default class SuperDao {
  private Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  // generic method for crud operations
  public async updateGeneric({
    where,
    updateData,
    transaction,
    include,
    extras,
  }: {
    where: object;
    updateData: object;
    transaction?: any;
    include?: any[];
    extras?: object;
  }): Promise<any> {
    return this.Model.update(updateData, {
      where,
      transaction,
      include,
      ...extras,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async createGeneric({
    createData,
    transaction,
    include,
    extras,
  }: {
    createData: object;
    transaction?: any;
    include?: any[];
    extras?: object;
  }): Promise<any> {
    return this.Model.create(createData, {
      transaction,
      include,
      ...extras,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async findAllGeneric({
    where,
    attributes,
    limit,
    offset,
    include,
    order,
  }: {
    where: object;
    attributes?: string[] | null;
    limit?: number | null;
    offset?: number | null;
    include?: any[];
    order?: any[];
  }): Promise<any> {
    return this.Model.findAll({
      where,
      attributes,
      limit,
      offset,
      include,
      order,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async findOneGeneric({
    where,
    attributes,
    include,
    transaction,
  }: {
    where: object;
    attributes?: string[] | null;
    include?: any[];
    transaction?: any;
  }): Promise<any> {
    return this.Model.findOne({
      where,
      attributes,
      include,
      transaction,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async deleteGeneric({
    where,
    transaction,
    include,
    extras,
  }: {
    where: object;
    transaction?: any;
    include?: any[];
    extras?: object;
  }): Promise<any> {
    return this.Model.destroy({
      where,
      transaction,
      include,
      ...extras,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async bulkCreateGeneric({
    data,
    transaction,
    include,
    extras,
  }: {
    data: object[];
    transaction?: any;
    include?: any[];
    extras?: object;
  }): Promise<any> {
    return this.Model.bulkCreate(data, {
      transaction,
      include,
      ...extras,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }

  public async findByPkGeneric({
    id,
    attributes,
    include,
  }: {
    id: string | number;
    attributes?: string[] | null;
    include?: any[];
  }): Promise<any> {
    return this.Model.findByPk(id, {
      attributes,
      include,
    })
      .then((result: any) => result)
      .catch((e: any) => {
        logger.error(e);
      });
  }
}

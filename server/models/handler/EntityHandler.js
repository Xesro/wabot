const logger = require('../../logger/logger.js')

class entityHandler {
    async updateById(fields, id) {
        let entity = await this.entity.update(
            fields,
            {where: {id : id}}
        ).catch(err => {
            logger.error("error while updating" +  this.entity)
        })

        return entity._previousDataValues // a tester
    }
}

module.exports = entityHandler

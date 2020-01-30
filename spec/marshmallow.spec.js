const {Unmarshaller, Marshaller} = require('../marshmallow');

describe('marshmallow =>', () => {

    describe('for unmarshallers =>', () => {
        let unmarshallers;

        beforeEach(() => {
            unmarshallers = [new CsvUnmarshaller(), new JsonUnmarshaller2(), new JsonUnmarshaller1(), new PlainTextUnmarshaller()];
        });

        it('finds the best match', () => {
            const result = Unmarshaller.findFirst(unmarshallers, 'application/json');

            expect(result.match).toBeInstanceOf(JsonUnmarshaller1);
        });

        it('finds the best match with default content type', () => {
            const result = Unmarshaller.findFirst(unmarshallers);

            expect(result.match).toBeInstanceOf(PlainTextUnmarshaller);
        });
    });

    describe('for marshallers =>', () => {
        let marshallers;

        beforeEach(() => {
            marshallers = [new CsvMarshaller(), new JsonMarshaller2(), new JsonMarshaller1(), new PlainTextMarshaller()];
        });

        it('finds the best match', () => {
            const result = Marshaller.findFirst(marshallers, 'application/json');

            expect(result.match).toBeInstanceOf(JsonMarshaller1);
        });

        it('finds the best match with default content type', () => {
            const result = Marshaller.findFirst(marshallers);

            expect(result.match).toBeInstanceOf(PlainTextMarshaller);
        });
    });
});

class CsvUnmarshaller extends Unmarshaller {
    canonicalMimeType() {
        return 'text/csv';
    }

    priority() {
        return 1;
    }
}

class PlainTextUnmarshaller extends Unmarshaller {
    canonicalMimeType() {
        return 'text/plain';
    }

    priority() {
        return 5;
    }
}

class JsonUnmarshaller1 extends Unmarshaller {
    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 10;
    }
}

class JsonUnmarshaller2 extends Unmarshaller {
    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 15;
    }
}

class CsvMarshaller extends Marshaller {
    canonicalMimeType() {
        return 'text/csv';
    }

    priority() {
        return 1;
    }
}

class PlainTextMarshaller extends Marshaller {
    canonicalMimeType() {
        return 'text/plain';
    }

    priority() {
        return 5;
    }
}

class JsonMarshaller1 extends Marshaller {
    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 10;
    }
}

class JsonMarshaller2 extends Marshaller {
    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 15;
    }
}

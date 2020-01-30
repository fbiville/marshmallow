const mediaTypeNegotiator = require('negotiator/lib/mediaType');

class Unmarshaller {
    /**
     * Returns the MIME type canonical string
     * @return string
     */
    canonicalMimeType() {
        throw new Error('not implemented')
    }

    /**
     * Returns the ordinal, positive integer value as priority. The lower, the more priority the marshaller is given.
     * @return number
     */
    priority() {
        throw new Error('not implemented')
    }

    /**
     * Converts the given input message into a specific data structure
     * @param riffMessage an input Message
     * @return an object
     * @throws Error if something unexpected occurs during the conversion
     */
    unmarshal(riffMessage) {
        throw new Error('not implemented')
    }

    /**
     * Finds the first unmarshaller in the given list matching the resolved content-type
     * @param rawContentType string (default: text/plain)
     * @param unmarshallers Unmarshaller[]
     * @return object {match: Unmarshaller|undefined, acceptedContentType: string}
     */
    static findFirst(unmarshallers, rawContentType) {
        // TODO correctly handle content-type charset, instead of ignoring it (and discarding q)
        const contentType = (rawContentType || 'text/plain').split(';')[0].trim();
        const sortedUnmarshallers = unmarshallers
            .filter(u => u instanceof Unmarshaller)
            .sort((u1, u2) => u1.priority() - u2.priority());
        const supportedContentTypes = sortedUnmarshallers.map(u => u.canonicalMimeType());
        const acceptedContentType = mediaTypeNegotiator(contentType, supportedContentTypes)[0];
        return {
            match: sortedUnmarshallers.find(u => u.canonicalMimeType() === acceptedContentType),
            acceptedContentType,
        };
    }
}

class Marshaller {
    /**
     * Returns the MIME type canonical string
     * @return string
     */
    canonicalMimeType() {
        throw new Error('not implemented')
    }

    /**
     * Returns the ordinal, positive integer value as priority. The lower, the more priority the marshaller is given.
     * @return number
     */
    priority() {
        throw new Error('not implemented')
    }

    /**
     * Converts the given function output into a riff Message
     * @param output an output object
     * @return Message
     * @throws Error if something unexpected occurs during the conversion
     */
    marshal(output) {
        throw new Error('not implemented')
    }

    /**
     * Finds the first marshaller in the given list matching the resolved content-type
     * @param rawContentType string (default: text/plain)
     * @param marshallers Marshaller[]
     * @return object {match: Marshaller|undefined, acceptedContentType: string}
     */
    static findFirst(marshallers, rawContentType) {
        // TODO correctly handle content-type charset, instead of ignoring it (and discarding q)
        const contentType = (rawContentType || 'text/plain').split(';')[0].trim();
        const sortedMarshallers = marshallers
            .filter(m => m instanceof Marshaller)
            .sort((m1, m2) => m1.priority() - m2.priority());
        const supportedContentTypes = sortedMarshallers.map(m => m.canonicalMimeType());
        const acceptedContentType = mediaTypeNegotiator(contentType, supportedContentTypes)[0];
        return {
            match: sortedMarshallers.find(m => m.canonicalMimeType() === acceptedContentType),
            acceptedContentType,
        };

    }
}

module.exports = {Unmarshaller, Marshaller};

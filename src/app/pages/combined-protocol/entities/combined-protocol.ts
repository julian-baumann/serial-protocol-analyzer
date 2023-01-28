import { DataSection } from "../../../services/entities/data-section";
import { SerialCommunicationRecording } from "../../../services/entities/serial-communication-recording";

export class CombinedProtocol {
    public protocol: SerialCommunicationRecording;
    public synchronizationSection: DataSection|undefined;
    public synchronizationTopPosition: number|undefined;
    public synchronizationElement: HTMLDivElement|undefined;

    public constructor(protocol: SerialCommunicationRecording) {
        this.protocol = protocol;
    }
}

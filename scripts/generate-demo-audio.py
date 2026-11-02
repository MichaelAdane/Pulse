"""Generate the three original Pulse demo loops using only Python's standard library."""
import math
from pathlib import Path
import struct
import wave

output = Path(__file__).resolve().parent.parent / 'dist' / 'audio'
output.mkdir(parents=True, exist_ok=True)
for name, notes, bpm in [
    ('after-hours', [220, 261.63, 329.63, 293.66], 100),
    ('amber-skies', [196, 246.94, 293.66, 220], 80),
    ('blue-sunday', [174.61, 220, 261.63, 196], 70),
]:
    rate, length = 22050, 24
    with wave.open(str(output / (name + '.wav')), 'wb') as stream:
        stream.setparams((1, 2, rate, 0, 'NONE', 'not compressed'))
        data = bytearray()
        for i in range(rate * length):
            t = i / rate
            beat = t * bpm / 60
            f = notes[int(beat / 4) % 4]
            phase = beat % 1
            pad = sum(math.sin(2 * math.pi * f * r * t) for r in [1, 1.25, 1.5]) * .09
            bass = math.sin(2 * math.pi * f / 2 * t) * .14 * math.exp(-phase * 5)
            bell = math.sin(2 * math.pi * notes[int(beat * 2) % 4] * 2 * t) * .1 * math.exp(-(beat * 2 % 1) * 6)
            kick = math.sin(2 * math.pi * (45 * t + 1.5 * (1 - math.exp(-phase * 20)))) * .16 * math.exp(-phase * 24)
            fade = min(1, t / 1.5, (length - t) / 2)
            data.extend(struct.pack('<h', int((pad + bass + bell + kick) * fade * 25000)))
        stream.writeframes(data)
print('Generated three original 24-second demo loops.')

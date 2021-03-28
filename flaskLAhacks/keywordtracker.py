import requests

# paragraph = """
# A lot of this class is looking under the abstraction layer of the machine and trying to figure out how the machine handles data and represents data. We're going to look at representations of information as bit itself. So first up in this class, everything that we think about in terms of data, in terms of instruction, in terms of any storage that goes on inside the machine. >> In this class, we're going to look solely at binary systems where we have a bit being a 0 or a one. Now we're going to look at what we can do with bits more than why we actually need to use these bi-stable elements. >> So we have a ones place, we'll have a twos place, a fours place, and eights place, the 16's place and so forth. But what's important here is just to understand that with a pattern of ones and zeros, we can encode all of these number values depending on the semantics of where those ones with ears are. >> And that means that a cluster of those bits together forming a byte, can be represented with a binary value. >> Now it's often more convenient to view these in a form called hexadecimal. And so now because we only have ten numeric values that we can use 0 through nine. And so in this figure here, what they show in a typical memory dump as a collection of addresses on left hand side. And those addresses are locations in memory where these contents are stored. You can think of it as if you were to have a number of mailboxes. And if you're up on your hex, because remember the addresses here stored in hex values, the addresses are incrementing or going up by 16 each time. And so there's going to be a binary representation here as well. I'll ask where a value in decimal or hexadecimal or binary shown here relates to a particular character. >> But even though it's a numerical value in those eight bits, it would correspond to a mapping like ascii, which will show what character is being stored in that particular location. And so if I knew that I was using a chart and I pulled in a one byte char location from memory. >> I would interpret that to recipe as a particular character as opposed to a number. >> In contrast, a short, which is a two by quantity, is an integer value. Is that as a representation of logic in general that you're using for verification of different circuits. >> And see, and if I have something like variable a ampersand variable b, that saying that I want to perform the add operation at a bit-level on those two quantities. >> And if only one of a or B or one, then a and B would also be the only case where a and B would be one is the case where both a and B are one. >> Now an or operator is equal to one only when a or B is equal to one hour or both. >> And these are the types of operations that we're going to have supported. >> In such an example where we represent a collection of elements in a set with a byte. The symmetric difference would be what components are found in one or the other. If you wanted to remove out certain amounts of a, an integer value, if you wanted to cap it at a certain level of precision, for example, or remove certain elements, you can mask it using the ad showing. >> If you look at the binary representation of 41, it would be 01000001, and flipping those bits. They also have the property of allowing early termination, and we'll talk about what that means in the context of programming. >> And here in see a left shift will be represented with the double less than operator. >> But the left side is going to depend on whether you perform a logical shift or an arithmetic shift. >> And the logical case, we would right shift by two and then fill in the blanks that are left by zeros.
# """

def get_keywords(paragraph):
    response = requests.post("https://languages.cortical.io/rest/text/keywords?retina_name=en_general",
                            data=paragraph.encode('utf-8'),
                            headers={'Content-type': 'text/plain; charset=utf-8'})
    return response.json()
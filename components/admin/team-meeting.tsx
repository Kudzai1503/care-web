import { ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeamMeetingProps {
  topic: string
  link: string
  date: string
  day: number
  participants: string[]
}

export function TeamMeeting({
  topic,
  link,
  date,
  day,
  participants,
}: TeamMeetingProps) {
  return (
    <div className="rounded-xl bg-foreground p-5 text-background">
      <h3 className="mb-4 font-semibold">Team meeting</h3>
      
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs opacity-60">Topic</p>
              <p className="font-medium">{topic}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Link</p>
              <a href="#" className="font-medium underline">
                {link}
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-xs opacity-60">Participants</p>
            <div className="mt-1 flex -space-x-2">
              {participants.slice(0, 4).map((avatar, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-foreground">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    P{i + 1}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-primary px-4 py-3 text-primary-foreground">
          <span className="text-xs">{date}</span>
          <span className="text-2xl font-bold">{day}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium">
        <span>See Details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  )
}
